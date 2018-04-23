// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth : {
    // endpoint: 'http://10.49.110.68:8080/',
    endpoint: 'http://localhost:1639/',
    getUser: 'auth/getuser',
    loginUser: 'token'
  },
  API : {
    endpoint: 'http://localhost:1639/',
    // endpoint: 'http://10.49.110.68:8080/',
    getSolutionCommentsSolutionId: 'api/Solution/GetSolutionComments?solutionId=',
    getSolutionCommentsTextType: '&textType=',
    getSolutions: 'api/request/GetSolutions',
    getCategories: 'api/category/getCategories',
    sendInformationRequest: 'api/request/sendInformationRequest',
    sendTechnologyRequest: 'api/Request/GetSolutionsByTechnology',
    sendIndustrialSectorsRequest: 'api/Request/GetSolutionsByIndustrialSector',
    getTechnologies: 'api/technology/getTechnologies',
    getIndustrialSectors: 'api/IndustrialSector/getIndustrialSectors',
    getSolutionDetailById: 'api/Solution/GetSolutionDetailById?solutionId=',
  },
  helpMsg: {
    actionSuccessful: 'Acción realizada con éxito',
    credentialsNotDetected: 'No se han detectado las credenciales. Por favor, introduzcalas en el formulario',
    noSelectedReqDetails: 'Por favor, seleccione algún criterio de búsqueda',
    incompleteReqDetails: 'Por favor, rellene los criterios de búsqueda pendientes'
  },
  errorMsg: {
    loginIncorrect: 'Nombre de usuario y/o contraseña incorrectos',
    serverConnection: 'Problema de conexión con el servidor, compruebe la conexión por favor',
    textNotIntroduced: 'Por favor, desmarque la solución o introduzca un texto.',
    textNotIntroducedReqDetail: 'Por favor, desmarque la solución o introduzca un texto.',
    textNotIntroducedReqInnovation: 'Por favor, introduzca un texto.',
    unexpectedError: 'Error inesperado.'
  },
  MsgType: {
    error: 'danger',
    info: 'info',
    success: 'success',
    warning: 'warning'
  },
};
