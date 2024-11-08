import Image from "next/image";

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
                    <button className="header__btn-location">Выберите адрес</button>
                </div>
                <button className="header__btn-login">
                    Войти
                </button>
            </div>
        </section>
    </>
  );
}
