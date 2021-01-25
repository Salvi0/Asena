import { IPremium, PremiumStatus, PremiumType } from '../models/Premium';

class Premium{

    public type: PremiumType
    public status: PremiumStatus
    public finishAt: Date
    public startAt: Date

    constructor(data: IPremium){
        this.type = data.type
        this.status = data.status
        this.startAt = data.startAt
        this.finishAt = data.finishAt
    }

    hasExpired(): boolean{
        return Date.now() > +this.finishAt
    }

    humanizeType(): string{
        switch(this.type){
            case PremiumType.LIMITED:
                return 'normal'

            case PremiumType.PERMANENT:
                return 'permanent'

            default:
                return 'unknown'
        }
    }

}

export default Premium
