<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="tail"></div>
    <span class="z-1">Z</span>
    <span class="z-2">Z</span>
    <span class="z-3">Z</span>
    <div class="rabbit-body">
      <div class="face-container">
        <div class="rabbit-face">
          <div class="ear"></div>
          <div class="eye-l"></div>
          <div class="eye-r"></div>
          <div class="mouth"></div>
        </div>
      </div>
      <div class="leaf"></div>
      <div class="carrot"></div>
      <div class="hand-l"></div>
      <div class="hand-r"></div>
    </div>
    <div class="shadow"></div>
  </div>

  <div class="loader">
    <div> L </div>
    <div> O </div>
    <div> A </div>
    <div> D </div>
    <div> I </div>
    <div> N </div>
    <div> G </div>
    <div> </div>
    <div> </div>
    <div> </div>
  </div>
</template>

<style scoped lang="scss">
//* {
//  padding: 0;
//  margin: 0;
//  box-sizing: border-box;
//}
//body {
//  background-color: #e25a61;
//}
.container {
  height: 31em;
  width: 31em;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.rabbit-body {
  background-color: #d7dfe7;
  height: 8.12em;
  width: 15.62em;
  border-radius: 8.12em 8.12em 0 0;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 11.25em;
  background: radial-gradient(
      circle at 0 50%,
      #b5becd,
      #b5becd 60%,
      #d7dfe7 61%
  );
  z-index: 1;
}
.tail {
  position: absolute;
  background-color: #ffffff;
  height: 3.4em;
  width: 3.4em;
  border-radius: 50%;
  right: 5.93em;
  top: 15.93em;
}
.face-container {
  transform: rotate(-10deg);
  transform-origin: 0 100%;
  animation: nod 5s ease-in-out infinite;
}
@keyframes nod {
  50% {
    transform: rotate(0deg);
  }
}
.rabbit-face {
  background-color: #d7dfe7;
  height: 5.93em;
  width: 9.3em;
  border-radius: 4.68em 4.68em 0 0;
  position: absolute;
  left: -1.25em;
  top: -1.87em;
}
.rabbit-face:before {
  position: absolute;
  content: "";
  background-color: #d7dfe7;
  width: 11.25em;
  height: 3.75em;
  left: -0.93em;
  top: 5.62em;
  border-radius: 4.37em;
}
.ear {
  background-color: #d7dfe7;
  height: 8.12em;
  width: 2.18em;
  position: relative;
  top: -4.06em;
  left: 0.31em;
  border-radius: 1.25em 1.25em 0 0;
  box-shadow: 6.56em 0 0 #d7dfe7;
  z-index: -1;
}
.ear:before {
  position: absolute;
  content: "";
  background-color: #cd92b4;
  height: 7.31em;
  width: 1.37em;
  top: 0.37em;
  left: 0.37em;
  border-radius: 1.56em;
  box-shadow: 6.56em 0 0 #cd92b4;
}
.eye-l,
.eye-r {
  position: absolute;
  height: 0.81em;
  width: 1.56em;
  background-color: #101010;
  border-radius: 0 0 1.87em 1.87em;
  top: 3.75em;
}
.eye-l {
  left: 1.56em;
}
.eye-r {
  right: 1.56em;
}
.eye-l:before,
.eye-r:before {
  content: "";
  position: absolute;
  background-color: #d7dfe7;
  height: 0.75em;
  width: 1.12em;
  border-radius: 0 0 0.9em 0.9em;
  left: 0.23em;
  bottom: 0.25em;
}
.mouth {
  background-color: #ffffff;
  position: absolute;
  height: 1.87em;
  width: 2.5em;
  border-radius: 50% 50% 50% 50%/ 30% 30% 70% 70%;
  margin: auto;
  left: 0;
  right: 0;
  top: 4.06em;
}
.mouth:before {
  position: absolute;
  content: "";
  height: 0.93em;
  width: 1.25em;
  border-radius: 50% 50% 50% 50%/ 30% 30% 70% 70%;
  margin: auto;
  left: 0;
  right: 0;
  background-color: #101010;
}
.hand-l,
.hand-r {
  position: absolute;
  height: 2.5em;
  width: 5em;
  bottom: 0;
  border-radius: 0.93em 0.93em 0 0;
}
.hand-l {
  background-color: #b5becd;
  left: -3.12em;
}
.hand-r {
  background-color: #ffffff;
  left: 5em;
}
.hand-l:before,
.hand-r:before {
  position: absolute;
  content: "";
  height: 2em;
  width: 3.12em;
  bottom: 0;
  border-radius: 0.62em 0.62em 0 0;
}
.hand-l:before {
  background-color: #ffffff;
  right: -1.56em;
}
.hand-r:before {
  background-color: #b5becd;
  left: -1.56em;
}
.carrot {
  position: absolute;
  background-color: #e78f1d;
  width: 7.5em;
  height: 2.5em;
  border-radius: 25% 65% 65% 25%/ 50% 50% 50% 50%;
  left: -4.37em;
  bottom: 0.62em;
  transform: rotate(15deg);
}
.leaf,
.leaf:before {
  position: absolute;
  height: 2.5em;
  width: 2.5em;
  border-radius: 2.5em 0;
}
.leaf {
  background-color: #c9cf55;
  transform: rotate(-40deg);
  bottom: 2.5em;
  left: -5em;
}
.leaf:before {
  content: "";
  background-color: #9eb42e;
  transform: rotate(-80deg);
  bottom: 0;
  left: -1.25em;
}
.container span {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 2em;
  color: #4f1f22;
  position: absolute;
  transform: rotate(10deg);
  animation: snore 9s infinite linear forwards;
}
@keyframes snore {
  30% {
    transform: rotate(10deg) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(10deg) translateY(-7em);
    opacity: 0.2;
  }
}
.container .z-1 {
  top: 5.5em;
  left: 4.5em;
  animation-delay: 7s;
}
.container .z-2 {
  top: 7em;
  left: 3.5em;
  animation-delay: 1s;
}
.container .z-3 {
  top: 5em;
  left: 6em;
}
.shadow {
  background-color: #d34b58;
  width: 25em;
  height: 0.5em;
  border-radius: 0.31em;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 19.37em;
}



#loader-wrapper {
  background-image: linear-gradient(45deg, rgb(241, 70, 51), rgb(111, 142, 199));
  background-size: 400%;
  background-position: 0% 100%;
  animation: gradient 7.5s ease-in-out infinite;
}

#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: hidden;
}

#loader {
  display: flex;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #fff;
  animation: spin 1.7s linear infinite;
  z-index: 11;
}

#loader:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #fff;
  animation: spin-reverse .6s linear infinite;
}

#loader:after {
  content: "";
  position: absolute;
  top: -30px;
  left: -30px;
  right: -30px;
  bottom: -30px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}



.loader {
  top: 76%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: default;
  width: 100%;
  max-width: 990px;
  overflow: visible;
  z-index: 99;
}

.loader,
.loader div {
  position: absolute;
  height: 36px
}

.loader div {
  width: 30px;
  margin: 0 20px;
  opacity: 0;
  animation: move 2s linear infinite;
  transform: rotate(180deg);
  color: #fff;
  font-size: 2em;
}

.loader div:nth-child(8):before {
  background: #ffffff;
}

.loader div:nth-child(8):before,
.loader div:nth-child(9):before {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}

.loader div:nth-child(9):before {
  background: #f2f2f2
}

.loader div:nth-child(10):before {
  bottom: -15px;
  height: 10px;
  background: #ffffff;
}

.loader div:after,
.loader div:nth-child(10):before {
  content: '';
  position: absolute;
  left: 0;
  width: 10px;
  border-radius: 100%;
}

.loader div:after {
  bottom: -40px;
  height: 5px;
  background: rgba(255, 255, 255, .1);
}

.loader div:nth-child(2) {
  animation-delay: .2s;
}

.loader div:nth-child(3) {
  animation-delay: .4s;
}

.loader div:nth-child(4) {
  animation-delay: .6s;
}

.loader div:nth-child(5) {
  animation-delay: .8s;
}

.loader div:nth-child(6) {
  animation-delay: 1s;
}

.loader div:nth-child(7) {
  animation-delay: 1.2s;
}

.loader div:nth-child(8) {
  animation-delay: 1.4s;
}

.loader div:nth-child(9) {
  animation-delay: 1.6s;
}

.loader div:nth-child(10) {
  animation-delay: 1.8s;
}

@keyframes move {
  0% {
    right: 0;
    opacity: 0
  }

  35% {
    right: 41%
  }

  35%,
  65% {
    transform: rotate(0);
    opacity: 1
  }

  65% {
    right: 59%
  }

  to {
    right: 100%;
    transform: rotate(-180deg)
  }
}


@media screen and (min-width: 700px) {
  .container {
    font-size: 20px;
  }
}


</style>