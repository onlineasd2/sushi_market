import Category from "./components/Category";
import Header from "./components/Header";
import Sets from "./components/Sets";
import Modal from "./components/Modal";
import Slider from "./components/Slider";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Header />
      <Category/>
      <Slider />
      <Sets titleMain="Наборы"></Sets>
      <Modal>
        <h2>Welcome to the Modal</h2>
        <p>This is a sample modal component.</p>
      </Modal>
      <Footer />
    </>
  );
}
