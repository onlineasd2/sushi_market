import Category from "./components/Category";
import Header from "./components/Header";
import Sets from "./components/Sets";
import Modal from "./components/Modal";
import ICard from "./interfaces/ICard";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

const cards: ICard[] = [
  {
    id: 1,
    image: "/sushi-card1.png",
    title: "Product 1",
    description: "This is the first product.",
    weight: 500,
    price: 1500,
  },
  {
    id: 2,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 3,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 4,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 5,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
  {
    id: 6,
    image: "/sushi-card1.png",
    title: "Product 2",
    description: "This is the second product.",
    weight: 300,
    price: 1200,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Category/>
      <Slider />
      <Sets titleMain="Наборы" cards={cards}></Sets>
      <Modal>
        <h2>Welcome to the Modal</h2>
        <p>This is a sample modal component.</p>
      </Modal>
      <Footer />
    </>
  );
}
