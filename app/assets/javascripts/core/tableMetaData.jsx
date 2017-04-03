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
        {type: "DEFAULT", field: "name"},
        {type: "DEFAULT", field: "creatorID"},
        {type: "DEFAULT", field: "managerID"},
        {type: "LINK", link: PROJECT_GET_BY_ID, linkField: "ID", label: "Endre"}
    ]
};

export const userTableMetaData = {
    ...metaData,
    headers: ["Klasse", "Brukernavn", "Fornavn", "Etternavn", "Epost"],
    rowMeta: [
        {type: "DEFAULT", field: "ucName"},
        {type: "DEFAULT", field: "USERNAME"},
        {type: "DEFAULT", field: "firstName"},
        {type: "DEFAULT", field: "lastName"},
        {type: "DEFAULT", field: "email"},
    ]
};
