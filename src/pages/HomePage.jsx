import React from "react";
import NavBar from "../components/NavBar";
import '../App.css'
import adventure from "../assets/adventure.svg";
import discount from "../assets/discount.svg";
import sertificate from "../assets/sertificate.svg";
import solution from "../assets/solution.svg";

const HomePage = () => {
return (
    <div>
      <NavBar />

      {/* Header */}
      <section className="p-5 m-5 text-center text-sm-start">
        <div className="container">
          <div className="d-flex align-items-center">
            <div>
              <h1>
                <span className="text-success">Kebersihan</span> Membuat{" "}
                <span className="text-success">Perbedaan</span>
              </h1>
              <p className="lead">
              Pilih <span className="text-danger fw-bold">Kualitas</span>, Pilih <span className="text-danger fw-bold">Enigma Laundry</span>
              </p>
              <button className="btn btn-primary btn-lg">Telusuri Layanan</button>
            </div>
            <img className="img-fluid w-50 d-none d-sm-block" src={adventure} alt="Adventure" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container pt-4" id="services">
        <div className="row text-center p-2">
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2 bg-light text-dark">
            <div className="card">
              <img src={discount} className="card-img-top" alt="Navigating" />
              <div className="card-body">
                <h5 className="card-title">harga terjangkau</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2">
            <div className="card">
              <img src={solution} className="card-img-top" alt="Moments" />
              <div className="card-body">
                <h5 className="card-title">Fasilitas Terbaik</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2 bg-light text-dark">
            <div className="card">
              <img src={sertificate} className="card-img-top" alt="Pesawat" />
              <div className="card-body">
                <h5 className="card-title">Tersertivikasi</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export default HomePage;
