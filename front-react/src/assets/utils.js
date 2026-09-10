
/**
 * 
 * @param {String} url -- la partie de l'url voulue (/objets/1 par exemple) 
 * @param {*} method -- GET si vide, ou POST, PUT, PATCH
 * @param {*} data  -- les données à mettre dans le body sous format d'un tableau d'objet JSON
 * @param {*} customHeaders -- données à ajouter au Hearders
 * @returns -- JSON de données de l'API
 */
export const getData = async (url, method = 'GET', data = null, customHeaders = {}) => {
    //création de l'url pour notre requête au serveur
    const URLAPI = `http://localhost:3000/api${url}`;
    
    //création des options de la  requête (GET, POST, PUT, PATCH)
    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
                    ...customHeaders,
        }
    }
    
    //ajout du body si requêtes de création ou modification
    if (data && ['POST', 'PUT', 'PATCH'].includes(options.method)) {
        options.body = JSON.stringify(data);
    }
    try{
        const response = await fetch(URLAPI, options);
        const maRep = await response.json();

        return maRep;
    }
    catch(error){
        console.error("ça marche pas", error);
    }
}
