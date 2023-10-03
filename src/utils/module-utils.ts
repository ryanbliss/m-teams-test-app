import * as teamsJs from "@microsoft/teams-js";

export interface IModule {
    isSupported: () => boolean;
    [key: string]: any;
}

export interface IModuleDetails {
    deprecated?: boolean;
    internal?: boolean;
    hidden?: boolean;
    beta?: boolean;
}

export function isModule(value: any): value is IModule {
    return typeof value === "object" && typeof value.isSupported === "function";
}

export function safeIsSupported(module: IModule): string {
    let text = "No";
    try {
        text = module.isSupported() ? "Yes" : "No";
    } catch (err: unknown) {
        text = "No (invalid frame)";
    }
    return text;
}

const moduleDetailsMap: Map<string, IModuleDetails> = new Map([
    [
        "appEntity",
        {
            hidden: true,
            internal: true,
        },
    ],
    ["appInstallDialog", {}],
    [
        "barCode",
        {
            beta: true,
        },
    ],
    ["calendar", {}],
    ["call", {}],
    [
        "chat",
        {
            beta: true,
        },
    ],
    [
        "clipboard",
        {
            beta: true,
        },
    ],
    [
        "conversations",
        {
            hidden: true,
            internal: true,
        },
    ],
    ["dialog", {}],
    [
        "dialog/url",
        {
            beta: true,
        },
    ],
    [
        "dialog/url/bot",
        {
            beta: true,
        },
    ],
    [
        "dialog/update",
        {
            beta: true,
        },
    ],
    [
        "dialog/adaptiveCard",
        {
            beta: true,
        },
    ],
    [
        "dialog/adaptiveCard/bot",
        {
            beta: true,
        },
    ],
    [
        "geoLocation",
        {
            beta: true,
        },
    ],
    [
        "geoLocation/map",
        {
            beta: true,
        },
    ],
    ["liveShare", {}],
    [
        "location",
        {
            deprecated: true,
        },
    ],
    [
        "logs",
        {
            hidden: true,
            internal: true,
        },
    ],
    ["mail", {}],
    [
        "marketplace",
        {
            hidden: true,
            beta: true,
        },
    ],
    [
        "meetingRoom",
        {
            hidden: true,
            internal: true,
        },
    ],
    ["menus", {}],
    ["monetization", {}],
    ["notifications", {}],
    ["pages", {}],
    ["pages/tabs", {}],
    ["pages/config", {}],
    ["pages/backStack", {}],
    [
        "pages/fullTrust",
        {
            hidden: true,
        },
    ],
    ["pages/appButton", {}],
    [
        "pages/currentApp",
        {
            beta: true,
        },
    ],
    ["people", {}],
    [
        "profile",
        {
            beta: true,
        },
    ],
    [
        "remoteCamera",
        {
            hidden: true,
            internal: true,
        },
    ],
    [
        "search",
        {
            beta: true,
        },
    ],
    [
        "secondaryBrowser",
        {
            beta: true,
        },
    ],
    ["sharing", {}],
    [
        "stageView",
        {
            beta: true,
        },
    ],
    [
        "teams",
        {
            hidden: true,
            internal: true,
        },
    ],
    [
        "teams/fullTrust",
        {
            hidden: true,
            internal: true,
        },
    ],
    [
        "teams/fullTrust/joinedTeams",
        {
            hidden: true,
            internal: true,
        },
    ],
    ["teamsCore", {}],
    [
        "video",
        {
            beta: true,
        },
    ],
    [
        "videoEx",
        {
            beta: true,
            hidden: true,
            internal: true,
        },
    ],
    [
        "webStorage",
        {
            beta: true,
        },
    ],
]);

export function getModuleDetails(path: string): IModuleDetails | undefined {
    return moduleDetailsMap.get(path);
}
