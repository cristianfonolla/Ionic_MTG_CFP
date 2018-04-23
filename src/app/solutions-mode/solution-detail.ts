import { SolutionSectorIndustrial } from "./solution-sector-industrial";
import { SolutionTechnologies } from "./solution-technologies";

export class SolutionDetail {
    solutionID: number;
    valoracionGlobal: number;
    facilidadIMPL: number;
    nivelReplicabilidad: number;
    valorMercado: number;
    valorEstrategico: number;
    tipologia: number;
    problemResolves: string;
    tsystemsAdvantatge: string;
    customerAdvantatge: string;
    solutionName: string;
    solutionImagePath: string;
    personaEmail: string;
    solutionTechnologies: SolutionTechnologies[];
    solutionIndSectors: SolutionSectorIndustrial[];
    vertPropietaryName: string;
    vertPropietaryId: number;
}
