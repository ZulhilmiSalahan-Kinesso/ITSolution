export class Deal {
    Id?: string;
    
    HirerId: string;
    HirerName?: string;
    FreelancerId: string;
    FreelancerName?: string;

    Title: string;
    Description: string;
    Offer: number;
    
    Status: string;
    DateCreated: string;
    StartDate: string;
    CompleteDate: string;
}