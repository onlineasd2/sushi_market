"use client";

import { Category } from "@/components/category/Category";
import { Header } from "@/components/header/Header";
import { Sets } from "@/components/sets/Sets";
import { Modal } from "@/components/modal/Modal";
import { Footer } from "@/components/footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
    return (
        <Provider store={store}>
            <Header />
            <Category />
            <Sets titleMain="Наборы" />
            <Modal>
                <h2>Welcome to the Modal</h2>
                <p>This is a sample modal component.</p>
            </Modal>
            <Footer />
        </Provider>
    );
}
