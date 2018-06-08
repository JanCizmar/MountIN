export class ActivityType{
    static HIKING = 1;
    static SKIING = 2;
    static BIKING = 3;

    static names = {
        [ActivityType.HIKING]: "Hiking",
        [ActivityType.SKIING]: "Skiing",
        [ActivityType.BIKING]: "Biking"
    }
}