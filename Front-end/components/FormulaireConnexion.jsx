/**
 * Composant pour afficher le formulaire de connexion.
 * Gère la soumission du formulaire et l'authentification de l'utilisateur.
 *
 */
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { declencherConnexion } from '../../features/gestionUtilisateur';
import { selectionnerErreurUtilisateur } from '../../app/selectors';
import './index.scss';

function FormulaireConnexion() {
  const dispatch = useDispatch();
  const erreurConnexion = useSelector(selectionnerErreurUtilisateur());
  const inputNomUtilisateur = useRef();
  const inputMotDePasse = useRef();
  const checkboxSeSouvenir = useRef();

  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    dispatch(
      declencherConnexion(
        inputNomUtilisateur.current.value,
        inputMotDePasse.current.value,
        checkboxSeSouvenir.current.checked
      )
    );
  };

  return (
    <form onSubmit={soumettreFormulaire}>
      <div className="input-wrapper">
        <label htmlFor="nomUtilisateur">Nom d'utilisateur</label>
        <input type="text" id="nomUtilisateur" ref={inputNomUtilisateur} required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input type="password" id="motDePasse" ref={inputMotDePasse} required />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="se-souvenir" ref={checkboxSeSouvenir} />
        <label htmlFor="se-souvenir">Se souvenir de moi</label>
      </div>
      <button type="submit" className="bouton-connexion">
        Se connecter
      </button>
      {erreurConnexion && (
        <p className="message-erreur">Erreur : Nom d'utilisateur ou mot de passe incorrect.</p>
      )}
    </form>
  );
}

export default FormulaireConnexion;