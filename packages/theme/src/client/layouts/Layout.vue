<script setup lang="ts">
import Home from "@theme/Home.vue";
import Navbar from "@theme/Navbar.vue";
import Page from "@theme/Page.vue";
import Sidebar from "@theme/Sidebar.vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  Transition,
  onBeforeUnmount,
  reactive,
} from "vue";
import { useRouter } from "vue-router";
import type { DefaultThemePageFrontmatter } from "../../shared";
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from "../composables";
import { Catalog } from "../components/Catalog";

const router = useRouter();
const page = usePageData();
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const themeLocale = useThemeLocaleData();

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

// classes
const containerClass = computed(() => [
  {
    "no-navbar": !shouldShowNavbar.value,
    "no-sidebar": !sidebarItems.value.length,
    "sidebar-open": isSidebarOpen.value,
    "catalog-open": shoudleShowCatalog.value,
  },
  frontmatter.value.pageClass,
]);

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
});
onUnmounted(() => {
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;

// catalog
const shoudleShowCatalog = ref(true);

const pageHeaders = computed(() =>
  shoudleShowCatalog.value ? page.value.headers : []
);

const flattenHeaders = (item: any) => {
  return item.children.length > 0
    ? [item].concat(...item.children.map(flattenHeaders))
    : item;
};

const headers = computed(() =>
  [].concat(...pageHeaders.value.map(flattenHeaders))
);

const state = reactive({
  headerHeight: 0,
  screenWidth: 0,
  catalogTop: 0,
  activeLink: "",
  isFixed: false,
});

const catalogTopAbsolute = 40;
const catalogTopFixed = 80;

const handleScroll = () => {
  // active link
  for (let i = headers.value.length - 1; i >= 0; i--) {
    const slug = (headers.value[i] as any).slug;
    const slugElement = document.querySelector<HTMLElement>(`#${slug}`);
    const headerTop = slugElement ? slugElement.getBoundingClientRect().top : 0;
    if (headerTop <= 100) {
      state.activeLink = slug;
      break;
    }
  }

  // catalog position
  const currentTop = window.pageYOffset;
  if (currentTop > state.headerHeight + catalogTopAbsolute - catalogTopFixed) {
    state.isFixed = true;
    state.catalogTop = catalogTopFixed;
  } else {
    state.isFixed = false;
    state.catalogTop = state.headerHeight + catalogTopAbsolute;
  }
};

const resetCatalogPosition = () => {
  const postHeader = document.querySelector<HTMLElement>(".post-header");
  state.headerHeight = postHeader ? postHeader.offsetHeight : 0;
  state.screenWidth = document.body.clientWidth;
  state.catalogTop = state.headerHeight + catalogTopAbsolute;
};

// reset catalog's position after navigation
let unregisterRouterHook2;

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  resetCatalogPosition();
  window.onresize = () => {
    return (() => {
      resetCatalogPosition();
      handleScroll();
    })();
  };

  unregisterRouterHook2 = router.afterEach(() => {
    resetCatalogPosition();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  unregisterRouterHook2();
});
</script>

<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <slot name="sidebar">
      <Sidebar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>

    <slot name="page">
      <Home v-if="frontmatter.home" />

      <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #content-top>
            <slot name="page-content-top" />
          </template>
          <template #content-bottom>
            <slot name="page-content-bottom" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </Transition>
    </slot>

    <slot name="catalog">
      <Catalog
        v-if="shoudleShowCatalog"
        :headers="headers"
        :active-link="state.activeLink"
        :class="{ fixed: state.isFixed }"
        
      />
    </slot>
  </div>
</template>
