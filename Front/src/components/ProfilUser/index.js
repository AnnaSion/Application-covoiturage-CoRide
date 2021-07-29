import React from 'react';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


import Field from 'src/components/ProfilUser/Field';
import 'src/components/ProfilUser/styles.scss';
import icone from 'src/assets/images/login.png';

const ProfilUser = ({

activity,
last_name,
first_name,
pseudo,
email,
password,
birthdate,
tags,

onInputChange,
onSubmitProfil,
handleFetchActivities,
//ajout picture
picture,

}) => {

  if(tags.length<1){
    handleFetchActivities();
  }
    const handleSubmit = (evt) => {   
    evt.preventDefault();

    
   

    //on récupere le password, on construit notre regexp et on check
    const password = evt.target.querySelector('input[name="password"]').value;
    const regexp = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*#$@%_])([-+!*#$@%_\\w]{8,})$");
    const checkPassword = regexp.test(password); 
     //si password non conform return
     if(!checkPassword) {
     console.log("ton mot de passe n'est pas conforme au format attendu")
      return;
    }
    console.log('submit');
    onSubmitProfil();
  };

  //
  const changeField = (evt) => {
    //evt.preventDefault();
    const value = evt.target.value;
    onInputChange(evt.target.name, value )
  };


  //on permet le téléchargement d'une photo
  const handleUpload = (evt) => {
    console.log(evt.target.files[0]);
    this.setState({ picture: evt.target.files[0] });
  };


return (
    <div className="profil">
      <div className="profil-form">
          <form 
            className="profil-form-element"
            autoComplete="off"        
            onSubmit={handleSubmit}
            enctype="application/x-www-form-urlencoded"
          >
            <h1 className="profil-form-title">
            Modifier le profil
            </h1>
        <div className="profil-form-header">
          <div className="profil-form-upper">
            <div className="profil-form-upper_picture">
            <img className="profil-form-upper_picture_icone" src={icone} alt="photo kite" />
            </div>
                <input
                  className="profil-form-upper_upload"
                  type="file"
                  name="picture"
                  placeholder="Picture"
                  accept="image/png, image/jpeg"
                  onChange={handleUpload}          
                /> 
               </div>
              <div className="profil-form-identity">
              <div className="profil-form-firstname">
                <input
                  className="profil-form-firstname"
                  type="text"
                  name="prénom"
                  placeholder="Prénom"
                  onChange={changeField}
                  value={first_name}
                />
                </div>
                <div className="profil-form-lastname">
                <input
                  className="profil-form-lastname"
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={changeField}
                  value={last_name}
                />
                </div>
                </div>
                 </div>
                 <div className="profil-form-pseudobirthdate">
                <input
                  className="profil-form-input"
                  type="text"
                  name="pseudo"
                  placeholder="Pseudo"
                  onChange={changeField}
                  value={pseudo}
                />
               
                <input
                  className="profil-form-date"
                  type="date"
                  name="birthdate"
                  placeholder="Date de naissance"
                  onChange={changeField}
                  value={birthdate}
                />
              </div>
              
              <div className="profil-form-sport">
                <select
                  className="profil-form-sport_select"
                  type="select"
                  name="activity_id"
                  value={activity}
                  onChange={changeField}
                >
                  <option
                  className="profil-form-sport_title" 
                  value=""
                  >Choisissez votre sport passion n°1
                  </option>
                 {tags.map((tag) => (
                    <option
                      name="tag"
                      key={tag.id}
                      value={tag.id}
                    >
                      {tag.label}
                    </option>
                  ))}
                </select>
                
            <div className="profil-form-sport_others">       
            <input type="text" className="profil-form-sport_input" placeholder="Sport passion n°2"></input>    
            <input type="text" className="profil-form-sport_input" placeholder="Sport passion n°3"></input>
              </div>                
              </div> 
             
              <div className="profil-form-bio">
                <textarea 
                
                className="profil-form-textarea" 
                cols="20" rows="5" wrap="hard" 
                placeholder="plus d'informations sur vous, vos spots préférés"
                onChange={changeField}  
                
               >
                </textarea>  
              </div>
              
              <div className="profil-form-emailpassword">
              <input
                  className="profil-form-input"
                  type="email"
                  name="email"
                  placeholder="E-mail" 
                  onChange={changeField}
                  value={email}
                />

              <input
                  className="profil-form-input"
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  onChange={changeField}
                  value={password}
                />
                </div>
              <div className="profil-form-button">
                <button 
                type="submit" 
                className="profil-form-submit"
                >
                  Sauvegarder
                </button>
              </div>
          </form>
              <div className="home-redirection">
                <p className="home-redirection-text">
                    Retour sur la        
                  <Link
                    className="home-redirection-link"
                    to="/"
                  >
                  page d'accueil
                  </Link>
                </p>
              </div>         
        </div>
      </div>
    );
};

ProfilUser.propTypes = {
  last_name: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  onSubmitProfil: PropTypes.func.isRequired,
  //onChange: PropTypes.func.isRequired,
  tags: PropTypes.shape({
    sport: PropTypes.string.isRequired,
   })
 
  
};

export default ProfilUser;



// autres champs  pour le profil de l'utilisateur
/*}
                <Field
                  className="profil-form-input"
                  type="text"
                  name="adresse"
                  placeholder="Adresse postale"
                  onChange={changeField}
                  value={coords}
                />

                <Field
                  className="profil-form-input"
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  onChange={changeField}
                  value={city}
                />

                <Field
                  className="profil-form-input"
                  type="number"
                  name="code postal"
                  placeholder="Code postal"
                  onChange={changeField}
                  value={postcode}
                />
                <Field
                  className="profil-form-input"
                  type="text"
                  name="pays"
                  placeholder="Pays"
                  onChange={changeField}
                  value={country}
                />
                  <p className="profil-form-text">Ajout d'un véhicule</p>

                <Field
                  className="profil-form-input"
                  type="text"
                  name="voiture"
                  placeholder="Marque"
                  onChange={changeField}
                  value={brand}
                />

                <Field
                  className="profil-form-input"
                  type="text"
                  name="model"
                  placeholder="Modèle"
                  onChange={changeField}
                  value={model}
                />       
              */

                /*
                 <p className="profil-form-text">Bio</p>
                 */


                 /*


                <p className="profil-form-text">Quel(s) sport(s) de glisse pratiquez vous ?</p>
          */