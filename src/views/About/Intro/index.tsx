import { Translate } from '~/components'

import ILLUSTRATION_1 from '@/public/static/images/about/intro-illustration-1.png'
import ILLUSTRATION_2 from '@/public/static/images/about/intro-illustration-2.png'
import ILLUSTRATION_3 from '@/public/static/images/about/intro-illustration-3.png'
import IMAGE_WAVE_1 from '@/public/static/images/about/wave-intro-1.svg'
import IMAGE_WAVE_2 from '@/public/static/images/about/wave-intro-2.svg'

import styles from './styles.css'

const Intro = () => {
  return (
    <section className="intro">
      <ul>
        <li className="l-container full ecosystem">
          <div className="l-row">
            <img src={ILLUSTRATION_1} />

            <section className="content">
              <h3>
                <Translate
                  zh_hant="生態：自主、自由"
                  zh_hans="生态：自主、自由"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters 致力搭建去中心化的內容存儲及分發系統，令創作不受制於任何平台，獨立性得到保障。同時，與 LikeCoin 基金會聯手，將 LikeCoin 這一以寫作者創造力為衡量的加密貨幣，以收入的形式回饋給作者。"
                  zh_hans="Matters 致力搭建去中心化的内容存储及分发系统，令创作不受制于任何平台，独立性得到保障。同时，与 LikeCoin 基金会联手，将 LikeCoin 这一以写作者创造力为衡量的加密货币，以收入的形式回馈给作者。"
                />
              </p>
            </section>
          </div>
        </li>
        <li className="l-container full community">
          <div className="l-row">
            <img src={ILLUSTRATION_2} />

            <section className="content">
              <h3>
                <Translate
                  zh_hant="社區：開放、共治"
                  zh_hans="社区：开放、共治"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="Matters 是立足去中心化生態建立的，一個代碼開源、創作者自治的寫作社區。創作者可以在這裡寫作、發表、閱讀、討論，同時，為社區建立「共同生活、共同決定」的規則，未來進一步應用到去中心生態的其它社區。"
                  zh_hans="Matters 是立足去中心化生态建立的，一个代码开源、创作者自治的写作社区。创作者可以在这里写作、发表、阅读、讨论，同时，为社区建立「共同生活、共同决定」的规则，未来进一步应用到去中心生态的其它社区。"
                />
              </p>
            </section>
          </div>
        </li>
        <li className="l-container full feature">
          <div className="l-row">
            <section className="content">
              <span className="flag">
                <Translate
                  zh_hant="\\\ 新功能上線 ///"
                  zh_hans="\\\ 新功能上线 ///"
                />
              </span>
              <h3>
                <Translate
                  zh_hant="圍爐：連結、交流"
                  zh_hans="围炉：连结、交流"
                />
              </h3>
              <p>
                <Translate
                  zh_hant="圍爐，立足 Matters 社區，幫助創作者建立、維繫更緊密的支持者社群，並基於訂閱機制，對創作者形成從交流到金流的正向反饋。"
                  zh_hans="围炉，立足 Matters 社区，帮助创作者建立、维系更紧密的支持者社群，并基于订阅机制，对创作者形成从交流到金流的正向反馈。"
                />
              </p>
            </section>

            <img src={ILLUSTRATION_3} />
          </div>
        </li>
      </ul>

      <style jsx>{styles}</style>
      <style jsx>{`
        .ecosystem {
          background-image: url(${IMAGE_WAVE_1});
        }
        .feature {
          background-image: url(${IMAGE_WAVE_2});
        }
      `}</style>
    </section>
  )
}

export default Intro
