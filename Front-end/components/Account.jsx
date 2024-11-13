/**
 * Composant pour afficher les informations d'un compte.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.titre - Le titre du compte.
 * @param {string} props.montant - Le montant du compte.
 * @param {string} props.description - La description du compte.
 */
import './index.scss';

function Compte({ titre, montant, description }) {
  return (
    <section className="compte">
      <div className="compte-contenu">
        <h3 className="compte-titre">{titre}</h3>
        <p className="compte-montant">{montant}</p>
        <p className="compte-description">{description}</p>
      </div>
      <div className="compte-actions">
        <button className="bouton-transactions">Voir les transactions</button>
      </div>
    </section>
  );
}

export default Compte;