import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

const Signin = () => (
    <div className="registration">
      <h1 className="registration-title">
        Inscription
      </h1>
      <form
        className="registration-form"
        // onSubmit={handleSubmit}
      >
        <div className="registration-name">
          <input
            className="registration-form_input__name nom"
            type="text"
            name="nom"
            placeholder="Nom"
            // onChange={(evt) => {
            //   const placeChose = evt.target.value;
            //   onInputChange(placeChose);
            // }}
          />
          <input
            className="registration-form_input__name"
            type="text"
            name="prénom"
            placeholder="Prénom"
            // onChange={(evt) => {
            //   const placeChose = evt.target.value;
            //   onInputChange(placeChose);
            // }}
          />
            </div>
        <input
            className="registration-form_input__name"
            type="text"
            name="text"
            placeholder="Pseudo"
            // onChange={(evt) => {
            //   const placeChose = evt.target.value;
            //   onInputChange(placeChose);
            // }}
          />
        
        <input
          className="registration-form_input"
          type="date"
          name="date de naissance"
          placeholder="Email"
          // onChange={(evt) => {
          //   const placeChose = evt.target.value;
          //   onInputChange(placeChose);
          // }}
        />

        <input
          className="registration-form_input"
          type="text"
          name="adresse"
          placeholder="Adresse"
          // onChange={(evt) => {
          //   const placeChose = evt.target.value;
          //   onInputChange(placeChose);
          // }}
        />
        <input
          className="registration-form_input"
          type="email"
          name="email"
          placeholder="Email"
          // onChange={(evt) => {
          //   const placeChose = evt.target.value;
          //   onInputChange(placeChose);
          // }}
        />

        <input
          className="registration-form_input__name nom"
          type="text"
          name="nom"
          placeholder="Nom"
        />
        <input
          className="registration-form_input__name"
          type="text"
          name="prénom"
          placeholder="Prénom"
        />

      </div>
      <input
        className="registration-form_input password"
        type="text"
        name="password"
        placeholder="Mot de passe"
      />

      <input
        className="registration-form_input"
        type="text"
        name="password"
        placeholder="confirmer votre mot de passe"
      />
      <button
        type="submit"
        className="registration-form_submit"
      >
        Ok
      </button>
    </form>
  </div>


);

export default Signin;
