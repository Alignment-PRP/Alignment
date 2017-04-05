//Mockup

const metaData = {
    page: 0,
    nRows: 0,
    objects: [],
    rowMeta: []
};

export const userTableMetaData = {
    ...metaData,
    rowMeta: [
        {label: 'Klasse', field: 'ucName', width: '20%'},
        {label: 'Brukernavn', field: 'USERNAME', width: '20%'},
        {label: 'Fornavn', field: 'firstName', width: '20%'},
        {label: 'Etternavn', field: 'lastName', width: '20%'},
        {label: 'Epost', field: 'email', width: '20%'},
    ]
};

export const userClassTableMetaData = {
    ...metaData,
    rowMeta: [
        {label: 'Navn', field: 'NAME', width: '30%'},
        {label: 'Beskrivelse', wrap: true, field: 'description', width: '70%'}
    ]
};

//TODO wip metadata, requirement
export const requirementTableMetaData = {
    ...metaData,
    rowMeta: [
        {label: 'Navn', field: 'name', width: '20%'},
        {label: 'Beskrivelse', field: 'description', width: '20%'},
        {label: 'Kommentar', field: 'comment', width: '20%'},
        {label: 'Kategori', field: 'cName', width: '20%'},
        {label: 'UnderKategori', field: 'scName', width: '20%'}
    ]
};
