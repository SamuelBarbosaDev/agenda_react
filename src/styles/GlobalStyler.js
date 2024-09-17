import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
/* Colors */
:root{
  --color-1: #1C5C8C;
  --color-2: #26465E;
  --color-3: #0071C5;
  --color-4: #1F2A33;
  --color-5: #C62C28;
  --color-6: #26465e11;
  --color-white: #FFFFFF;
  --color-black: #000000;
}

/* Gaps */
:root{
  --gap-default: 3rem;
  --gap-small: 1.5rem;
}

/* GLOBAL */
:root{
  font-size: 62.5%;
  font-family: sans-serif;
}

*{
  margin: 0;
  padding: 0;
}

html{
  scroll-behavior: smooth;
}

body{
  font-size: 1.6rem;
  font-family: sans-serif;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}

/* MAIN */
main{
  width: 100vw;
  display: flex;
  min-height: 100vh;
  align-items: center;
  background-color: var(--color-2);
}

.main-content{
  width: 60rem;
  display: flex;
  margin: 0 auto;
  min-height: 80rem;
  align-items: center;
  border-radius: 1.5rem;
  flex-direction: column;
  padding: var(--gap-default);
  background-color: var(--color-white);
}
`
