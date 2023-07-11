<!-- !DEPRECATED! - Unused Component -->

<template>
  <div class="topnav sticky transparent" id="topnav">
    <div class="all">
      <router-link to="/" class="name_base">
        <h1 class="name">
          <svg class="site-icon" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_120)">
              <path id="icon"
                d="M254.232 512L512 250.166H338.21C254.232 250.166 254.232 170.431 254.232 170.431V0L0 250.166H174.674C174.674 250.166 254.232 250.166 254.232 332.376V512Z" />
            </g>
            <defs>
              <clipPath id="clip0_1_120">
                <rect width="512" height="512" fill="white" />
              </clipPath>
            </defs>
          </svg>

        </h1>
      </router-link>
      <div class="nav-content">
        <a href="javascript:void(0);" interactable="true" class="icon" @click="toggleNav();">
          <div class="l l-1"></div>
          <div class="l l-2"></div>
          <div class="l l-3"></div>
        </a>
        <router-link to="/contact" interactable="true">Contact</router-link>
        <router-link to="/support" interactable="true">Support</router-link>
        <router-link to="/projects" interactable="true">Projects</router-link>
        <router-link to="/" interactable="true">About</router-link>
      </div>
      <div class="menu-items" id="nav-menu-items">
        <div class="nav primary" id="nav-panel.default">
          <router-link to="/contact" interactable="true" @click="toggleNav();">Contact</router-link>
          <router-link to="/support" interactable="true" @click="toggleNav();">Support</router-link>
          <router-link to="/projects" interactable="true" @click="toggleNav();">Projects</router-link>
          <router-link to="/" interactable="true" @click="toggleNav();">About</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  methods: {
    toggleNav: () => {
      var x = document.getElementById("topnav");
      if (!x?.classList.contains("responsive")) {
        x?.classList.add("responsive");
      } else {
        x.classList.remove("responsive")
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.topnav {
  transition: .2s ease;
  z-index: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 5em;
  position: fixed;
  width: 100%;
  color: #242424;

  &::after {
    clear: both;
    content: '';
    display: block;
  }

  #icon {
    fill: $background-dark;
  }

  &.light {
    #icon {
      fill: $background-light;
    }
  }

  .all {
    max-width: 1300px;
    width: 80%;
    display: flex;
    margin: 0 !important;

    .nav-content {
      display: flex;
      align-items: center;
    }

    .nav-content {
      margin: 0;
    }
  }

  .menu-items {
    display: none;
  }

  .icon {
    display: none;
    justify-content: center;
    align-items: center;
    width: 1.3em;
    height: 2em;
    position: relative;

    .l {
      position: absolute;
      height: .125em;
      width: 1.3em;
      background: $background-dark;
      transition: .4s ease;
      transform: translate(-50%, -50%);

      &.l-1 {
        top: 25%;
      }

      &.l-2 {
        top: 50%;
        width: 65%;
        transition: .2s ease;
      }

      &.l-3 {
        top: 75%;
        width: 30%;
      }
    }
  }

  &.responsive {
    background-color: $background-dark !important;

    #icon {
      fill: $background-light;
    }

    .icon {
      .l {
        background-color: $background-light;
      }

      .l-1 {
        transform: rotate(45deg) translateY(-50%);
        top: 50%
      }

      .l-2 {
        width: 0;
      }

      .l-3 {
        transform: rotate(-45deg) translateY(-50%);
        top: 50%;
        width: 100%;
      }
    }

    height: 100%;

    .menu-items {
      display: flex;
      position: absolute;
      top: 5em;
      float: left;
      text-align: left;
      width: 80%;
      flex-direction: column;
      align-items: flex-start;

      .nav {
        &.primary {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          opacity: 1;
          transition-property: margin opacity;
          transition: .2s ease;
          margin: 1em 0 0 1em;

          &.bclose {
            margin-left: -1.8em;
            opacity: 0;
          }

          &.close {
            display: none !important;
          }
        }
      }

      a {
        display: block !important;
        margin: 0.5em 0.625em;
        position: relative;
        color: #fff;
        cursor: pointer;

        &.active {
          background: transparent;
          color: $color-red;
          display: flex !important;
          align-items: center;

          .icn {
            .line {
              background: $color-red;
            }

            .arrow {
              border-color: $color-red;
            }
          }

          .avatar {
            width: 2em;
            height: 2em;
            display: inline-flex;
            background: $color-red;
            color: #fff !important;
            border-radius: 100px;
            justify-content: center;
            align-items: center;
            margin-right: .5em;
          }

          &:hover {
            .icn {
              .line {
                background: $third-dark;
                left: .5em;
                width: .8em;
              }

              .arrow {
                border-color: $third-dark;
              }

            }
          }
        }
      }
    }
  }

  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .name_base {
    margin-right: auto;
    display: flex;
    align-items: center;

    .name {
      margin: 0 .75em 0 .375em;
    }

    .site-icon {
      transition: .2s ease;
      width: 1.4em;
      height: 1.4em;
      vertical-align: middle;
    }

    &:hover {
      background: transparent;
    }
  }

  .dropbtn {
    margin: .375em !important;
    border-radius: 15px;
    background: transparent;
    padding: .75em .875em;
  }

  a {
    transition: .2s ease;
    float: right;
    display: block;
    text-align: center;
    margin: .375em .625em;
    border-radius: 15px;
    text-decoration: none;
    font-size: $font-size-default;
    text-transform: uppercase;
    color: $background-dark;
    padding: .3em .625em;
    cursor: pointer;

    &.active {
      background: #000;
      color: #fff;

      .icn {
        .line {
          background: #fff;
        }

        .arrow {
          border-color: #fff;
        }
      }

      &:hover {
        color: $color-red !important;

        .icn {
          .line {
            background: $color-red;
            left: .4em;
            width: .875em;
          }

          .arrow {
            border-color: $color-red;
          }

        }
      }
    }

    &:hover {
      color: $color-purple !important;
    }
  }

  .user {
    position: relative;

    .header {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      flex-wrap: nowrap;
      background: $background-dark;
      border-radius: .3em;
      padding: .5em .625em;
      cursor: pointer;

      * {
        margin: 0 .375em 0px .375em;
      }

      .icon {
        border: solid #fff;
        border-width: 0 .125em .125em 0;
        display: inline-block;
        padding: .1875em;
        border-radius: 1px;
        transform: rotate(45deg);
        transition: .2s ease;
        width: .0625em;
        height: .0625em;
        margin: .4375em;
        margin-top: 0;
        margin-bottom: .25em;
      }

      .avatar {
        width: 1.625em;
        height: 1.625em;
        background: $color-red;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .body {
      position: absolute;
      background: $background-dark;
      border-radius: .3125em;
      float: left;
      display: none;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      min-width: 13.125em;
      right: 0px;
      margin-top: .625em;
      text-align: left;
      padding: .625em .5em;

      a {
        text-align: left !important;
        border-radius: .3125em !important;
        margin: .3125em;
        padding: .625em 1em;
        display: flex;
        align-items: center;

        img {
          margin-right: .3125em;
          width: 1.25em;
        }

        .icn.arrw {
          margin-left: auto;
        }

        &:hover {
          color: #fff !important;
          background: var(--second-dark);

          .icn.arrw {
            .line {
              left: .4375em !important;
              width: .875em !important;
            }
          }
        }
      }
    }

    &.open {
      .header {
        .icon {
          transform: rotate(-135deg) !important;
          margin-top: .25em;
          margin-bottom: 0;
        }
      }

      .body {
        display: flex;
      }
    }
  }
}

@media screen and (max-width: 870px) {
  .topnav {
    overflow: overlay;
    overflow-y: hidden;

    a:not(:first-child),
    .dropdown .dropbtn {
      display: none !important;
    }

    .nav-content {
      margin: 0 !important;
    }

    .nav-content-2 {
      display: none !important;
    }

    a.icon {
      float: right;
      display: flex;
      padding: 0;
      margin: 6px 20px 6px 6px;
    }

    .all {
      min-width: 95%;
    }

    .responsive {
      position: relative;
      height: auto;

      .icon {
        display: flex;
        position: absolute;
        right: 15px;
        top: 0;
      }

      a,
      .dropdown {
        float: none;
        display: block;
        text-align: left;
        margin: 12px 20px;
        color: #fff;
      }

      .dropdown {
        .dropcontent {
          background: transparent;
          position: relative;
          margin: 0 12px;
        }

        .dropbtn {
          display: block;
          width: 100%;
          text-align: left;
          margin: 0 !important;
        }
      }
    }
  }
}
</style>