import { userMock } from '../datas/users-mock';


export function LoginMock(username, password) {

    // Vérification que les deux champs sont saisis
    if (!username || !password) {
        return { success: false, message: "Veuillez saisir un nom d'utilisateur et un mot de passe." };
    }

    // Vérification que username et le password associé existent bien dans les données
    const user = userMock.find (
        (u) => u.username === username && u.password === password
    );

    // Erreur si l'utilisateur n'existe pas ou ne correspond pas à son mot de passe
    if (!user) {
        return {success: false, error:"Identifiants incorrects, veuillez vérifier votre saisie."};
    }

    // Si tout est ok, on stocke dans le localStorage
    localStorage.setItem("userId", user.id);

    return {succes: true, user};
}