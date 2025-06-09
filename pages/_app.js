// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'  // <-- เพิ่มบรรทัดนี้


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}