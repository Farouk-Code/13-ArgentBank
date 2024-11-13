/**
 * Composant principal de l'application.
 * Gère le routage, l'authentification initiale et le rendu des composants.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialiserAuthentification, definirProfilUtilisateur } from '../features/gestionUtilisateur';
import { verifierExpirationToken } from '../utils/jwt';
import ServiceUtilisateur from '../services/ServiceUtilisateur';
import Entete from './components/Entete';
import Accueil from './pages/Accueil';
import Erreur from './pages/Erreur';
import PiedDePage from './components/PiedDePage';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import RoutesProtegees from './components/RoutesProtegees';


function Application() {
  const dispatch = useDispatch();
  const tokenLocalStorage = localStorage.getItem('argentBankToken');

  useEffect(() => {
    const chargerProfilUtilisateur = async (token) => {
      const serviceUtilisateur = new ServiceUtilisateur();
      const infosUtilisateur = await serviceUtilisateur.recupererProfilUtilisateur(token);
      dispatch(definirProfilUtilisateur(infosUtilisateur));
    };

    if (tokenLocalStorage && !verifierExpirationToken(tokenLocalStorage)) {
      dispatch(initialiserAuthentification(tokenLocalStorage));
      chargerProfilUtilisateur(tokenLocalStorage);
    }
  }, [dispatch, tokenLocalStorage]);

  return (
    <div className="application">
      <BrowserRouter>
        <Entete />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Connexion />} />
          <Route element={<RoutesProtegees />}>
            <Route path="/profile" element={<Profil />} />
          </Route>
          <Route path="*" element={<Erreur />} />
        </Routes>
        <PiedDePage />
      </BrowserRouter>
    </div>
  );
}

export default Application;