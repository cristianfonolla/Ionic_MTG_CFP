export const environment = {
  production: true,
  auth : {
    endpoint: 'http://10.49.110.68/API/',
    getUser: 'auth/getuser',
    loginUser: 'token'
  },
  API : {
    endpoint: 'http://10.49.110.68/API/',
    getSolutions: 'api/request/GetSolutions',
    getCategories: 'api/category/getCategories',
    sendInformationRequest: 'api/request/sendInformationRequest',
    sendTechnologyRequest: 'api/Request/GetSolutionsByTechnology',
    sendIndustrialSectorsRequest: 'api/Request/GetSolutionsByIndustrialSector',
    getTechnologies: 'api/technology/getTechnologies',
    getIndustrialSectors: 'api/IndustrialSector/getIndustrialSectors',
    getSolutionCommentsSolutionId: 'api/Solution/GetSolutionComments?solutionId=',
    getSolutionCommentsTextType: '&textType=',
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
