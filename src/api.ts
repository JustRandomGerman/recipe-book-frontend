import axios from 'axios';
import { Recipe } from './js/interfaces/Recipe';
import { Tag } from './js/interfaces/Tag';
import { Collection } from './js/interfaces/Collection';

const baseURL = "http://localhost:3000";

const getRecipes = function(){
    return axios.get<Recipe[]>(`${baseURL}/recipes`).then((response) => {
        return response.data;
    });
}

const getRecentRecipes = function(amount: number){
    return axios.get<Recipe[]>(`${baseURL}/recipes/recent?amount=${amount}`).then((response) => {
        return response.data;
    });
}

const getRecipe = function(id: number){
    return axios.get<Recipe>(`${baseURL}/recipes/${id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    });
}

const createRecipe = function(recipe: Recipe){
    return axios.post<Recipe>(`${baseURL}/recipes`,{
        ...recipe
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.map((detail: any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    });
}

const updateRecipe = function(id: number, recipe: Recipe){
    return axios.put<Recipe>(`${baseURL}/recipes/${id}`, {
        ...recipe
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.map((detail: any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    });
}

const deleteRecipe = function(id: number){
    return axios.delete(`${baseURL}/recipes/${id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    });
}

const getCollections = function(){
    return axios.get<Collection[]>(`${baseURL}/collections`).then((response) => {
        return response.data;
    })
}

const getCollection = function(id: number){
    return axios.get<Collection>(`${baseURL}/collections/${id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    })
}

const createCollection = function(collection: {name: string}){
    return axios.post<Collection>(`${baseURL}/collections`, {
        ...collection
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.map((detail: any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    })
}

const updateCollection = function(id: number, collection: Collection){
    return axios.patch<Collection>(`${baseURL}/collections/${id}`, {
        name: collection.name
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.map((detail: any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    });
}

const deleteCollection = function(id: number){
    return axios.delete(`${baseURL}/collections/${id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    });
}

const addRecipeToCollection = function(collection_id: number, recipe_id: number){
    return axios.post<Collection>(`${baseURL}/collections/${collection_id}/recipes/${recipe_id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    })
}

const removeRecipeFromCollection = function(collection_id: number, recipe_id: number){
    return axios.delete<Collection>(`${baseURL}/collections/${collection_id}/recipes/${recipe_id}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    })
}

const getAvailableTags = function(){
    return axios.get<Tag[]>(`${baseURL}/tags/available`).then((response) => {
        return response.data;
    });
}

const addAvailableTag = function(tag_name: string){
    return axios.post(`${baseURL}/tags/available`,{
        tag_name: tag_name
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.map((detail: any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    });
}

const uploadImage = function(files: FileList | null){
    const formData = new FormData;
    if(files === null){
        throw "Upload failed, because no images were provided"
    }
    formData.append("image", files![0]);
    return axios.post<{image: string}>(`${baseURL}/recipes/upload`, formData).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    });
}

const search = function(query: string, mode: string, tags: string[]){
    return axios.post<Recipe[]>(`${baseURL}/search`, {
        query: query,
        mode: mode,
        tags: tags
    }).then( (response) => {
        return response.data;
    }).catch( (error) => {
        if(error.response){
            throw `${error.response.status} - ${error.response.data.message}`;
        }
        else{
            throw 'something went wrong';
        }
    })
}

const getAPI = function(){
    return axios.get<string>(`${baseURL}/developer/api-documentation`)
}

export {getRecipes, getRecentRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getCollections, getCollection, createCollection, updateCollection, deleteCollection, addRecipeToCollection, removeRecipeFromCollection, getAvailableTags, addAvailableTag, uploadImage, search, getAPI};