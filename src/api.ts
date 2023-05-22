import axios from 'axios';
import { Recipe } from './js/interfaces/Recipe';
import { Tag } from './js/interfaces/Tag';

const baseURL = "http://localhost:3000";

const getRecipes = function(){
    return axios.get<Recipe[]>(`${baseURL}/recipes`).then((response) => {
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
        const details = error.response.data.message.details.map((detail : any) => `${detail.message}\n`);
        throw `${error.response.status} - ${details}`;
    });
}

const updateRecipe = function(id: number, recipe: Recipe){
    return axios.put<Recipe>(`${baseURL}/recipes/${id}`, {
        ...recipe
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        const details = error.response.data.message.details.map((detail : any) => `${detail.message}\n`);
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

const getAvailableTags = function(){
    return axios.get<Tag[]>(`${baseURL}/tags/available`).then((response) => {
        return response.data;
    });
}

const uploadImage = function(files : FileList | null){
    const formData = new FormData;
    if(files === null){
        throw "Upload failed, because no images were provided"
    }
    formData.append("image", files![0]);
    return axios.post<{image : string}>(`${baseURL}/recipes/upload`, formData).then((response) => {
        return response.data;
    }).catch((error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    });
}

const search = function(query : string, mode : string, tags : string[]){
    return axios.post<Recipe[]>(`${baseURL}/search`, {
        query: query,
        mode: mode,
        tags: tags
    }).then( (response) => {
        return response.data;
    }).catch( (error) => {
        throw `${error.response.status} - ${error.response.data.message}`;
    })
}

export {getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getAvailableTags, uploadImage, search};