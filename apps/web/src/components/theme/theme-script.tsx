/**
 * Applies the stored theme before first paint to avoid a flash.
 * The script body is a static string with no user input.
 */
const SCRIPT = `(function(){try{var t=localStorage.getItem('du-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');setTimeout(function(){document.documentElement.setAttribute('data-motion-ready','')},3000)}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
