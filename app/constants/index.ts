export const sidebarLinks = [
    {
        label: "Home",
        route: "/",
        imgUrl: "/icons/home.svg",
    },
    {
        label: "Upcoming",
        route: "/upcoming",
        imgUrl: "/icons/upcoming.svg",
    },
    {
        label: "Previous",
        route: "/previous",
        imgUrl: "/icons/previous.svg",
    },
    {
        label: "Recordings",
        route: "/recordings",
        imgUrl: "/icons/recordings.svg",
    },
    {
        label: "Personal Room",
        route: "/personal-room",
        imgUrl: "/icons/add-personal.svg",
    },
];

export const actionCards = [
    {
        id: 1,
        bgColor: "bg-orange-1",
        textPrimary: "New Meeting",
        textSecondary: "Setup a new recording",
        iconPath: "/icons/add-meeting.svg",
        meetingState: "isInstantMeeting",
    },
    {
        id: 2,
        bgColor: "bg-blue-1",
        textPrimary: "Join Meeting",
        textSecondary: "via invitation link",
        iconPath: "/icons/join-meeting.svg",
        meetingState: "isJoiningMeeting",
    },
    {
        id: 3,
        bgColor: "bg-purple-1",
        textPrimary: "Schedule Meeting",
        textSecondary: "Plan your meeting",
        iconPath: "/icons/schedule.svg",
        meetingState: "isScheduleMeeting",
    },
    {
        id: 4,
        bgColor: "bg-yellow-1",
        textPrimary: "View Recordings",
        textSecondary: "Meeting recordings",
        iconPath: "/icons/recordings.svg",
    },
];
