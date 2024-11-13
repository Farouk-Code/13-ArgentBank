/**
 * Composant pour afficher le formulaire de modification du profil utilisateur.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {function} props.definirModification - Fonction pour contrôler l'affichage du formulaire.
 * @version 1.0.0
 */
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectionnerPrenomUtilisateur, selectionnerNomUtilisateur } from '../../app/selectors';
import { declencherMiseAJourProfil } from '../../features/gestionUtilisateur';
import './index.scss';

function FormulaireModificationProfil({ definirModification }) {
  const dispatch = useDispatch();
  const prenomUtilisateur = useSelector(selectionnerPrenomUtilisateur());
  const nomUtilisateur = useSelector(selectionnerNomUtilisateur());
  const inputPrenom = useRef();
  const inputNom = useRef();

  const gererSoumission = async (e) => {
    e.preventDefault();
    dispatch(
      declencherMiseAJourProfil(inputPrenom.current.value, inputNom.current.value)
    );
    definirModification(false);
  };

  return (
    <form className="formulaire-modification-profil" onSubmit={gererSoumission}>
      <div className="groupe-input">
        <label htmlFor="prenom">Prénom</label>
        <input type="text" id="prenom" ref={inputPrenom} defaultValue={prenomUtilisateur} />
      </div>
      <div className="groupe-input">
        <label htmlFor="nom">Nom</label>
        <input type="text" id="nom" ref={inputNom} defaultValue={nomUtilisateur} />
      </div>
      <button className="bouton bouton-enregistrer" type="submit">
        Enregistrer
      </button>
      <button className="bouton bouton-annuler" onClick={() => definirModification(false)}>
        Annuler
      </button>
    </form>
  );
}

export default FormulaireModificationProfil;