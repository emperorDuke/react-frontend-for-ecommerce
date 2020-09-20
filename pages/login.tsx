import React from "react";
import { NextPage } from "next";
import { Container } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginSection from "../components/Loginsection/Page";

const login: NextPage = () => (
  <Container>
    <Header />
    <LoginSection />
    <Footer />
  </Container>
);

export default login;
