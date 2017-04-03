import {PROJECT_GET_BY_ID} from './../config.jsx';

const metaData = {
    headers: [],
    page: 0,
    nRows: 0,
    objects: [],
    rowMeta: []
};

export const projectTableMetaData = {
    headers: ["Navn", "Eier", "Leder", ""],
    page: 1,
    nRows: 10,
    objects: [],
    rowMeta: [
        {field: "name"},
        {field: "creatorID"},
        {field: "managerID"},
        {type: "LINK", link: PROJECT_GET_BY_ID, linkField: "ID", label: "Endre"}
    ]
};

export const userTableMetaData = {
    ...metaData,
    headers: ["Klasse", "Brukernavn", "Fornavn", "Etternavn", "Epost"],
    rowMeta: [
        {field: "ucName"},
        {field: "USERNAME"},
        {field: "firstName"},
        {field: "lastName"},
        {field: "email"},
    ]
};

export const classTableMetaData = {
    ...metaData,
    headers: ["Navn", "Beskrivelse"],
    rowMeta: [
        {field: "NAME"},
        {type: "WRAP", field: "description"}
    ]
};
