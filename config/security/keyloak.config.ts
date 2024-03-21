import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'url',
    realm: 'realm',
    clientId: 'clientId',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
