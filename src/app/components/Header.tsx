import './../styles.scss';
import './../styles/components/_header.scss';
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function Header() {
  return (
    <>
        <section className="section">

            <div className="header">
                <div className="header__container">
                    <div className="header__logo">
                        <Image
                            src="/logo.svg"
                            width={178}
                            height={56}
                            alt="logo"
                        />
                    </div>
                    <div className="header__location">
                        <h3>Ваш город <span className="text-red">Павлодар</span></h3>
                        <h3><span className="text-red">+7 747 095 83 04</span></h3>
                    </div>
                    <div className="header__find">
                        <Button style={"button button__location header__button-location"}>
                            <img src="./placeholder.png"/>
                            Выберите адрес
                        </Button>
                    </div>
                    <Button style={'button button__login'}>Войти</Button>
                </div>
            </div>

            <div className="header-mobile">
                <div className="header-mobile__container">
                    <div className="header-mobile__burger-menu">
                        <input id="menu__toggle" type="checkbox" />
                        <label className="menu__btn" htmlFor="menu__toggle"></label>
                    </div>
                    <Button style={'button'}>Позвонить</Button>
                    <Image
                        src="./mobileLogo.svg"
                        width={30}
                        height={21}
                        alt="logo"
                    />
                    <Image
                        src="/logout.png"
                        width={24}
                        height={24}
                        alt="logo"
                    />
                </div>
                <ul className="menu__box">
                    <li><Link href={"#"}>Войти</Link></li>
                    <li><Link href={"#"}>Павлодар</Link></li>
                    <li><Link href={"#"}>Русский</Link></li>
                    <li><Link href={"#"}>Политика конфиденциальности</Link></li>
                    <li><Link href={"#"}>Согласие на обработку ПД</Link></li>
                    <li><Link href={"#"}>Контактная и правовая информация</Link></li>
                    <li><Link href={"#"}>Акции</Link></li>
                    <li><Link href={"#"}>Программа лояльности “Ёби-клуб”</Link></li>
                    <li><Link href={"#"}>Доставка и оплата</Link></li>
                    <li><Link href={"#"}>О компании</Link></li>
                    <li><Link href={"#"}>+7 747 095 83 04</Link></li>
                </ul>
            </div>
        </section>
    </>
  );
}
