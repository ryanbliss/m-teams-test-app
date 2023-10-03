import { inTeams } from "../utils/inTeams";
import { CSSProperties, FC } from "react";
import { FlexColumn, FlexItem, FlexRow } from "../components";
import * as teamsJs from "@microsoft/teams-js";
import { Divider, Text, Tooltip, tokens } from "@fluentui/react-components";
import {
    CheckmarkCircle20Filled,
    ErrorCircle20Filled,
    EyeOff16Regular,
    QuestionCircle20Filled,
    StoreMicrosoft16Regular,
} from "@fluentui/react-icons";
import {
    IModule,
    getModuleDetails,
    isModule,
    safeIsSupported,
} from "../utils/module-utils";

const IN_TEAMS = inTeams();

export const TabContent: FC = () => {
    return (
        <FlexColumn scroll>
            <FlexItem noShrink>
                <SupportedCheck
                    label="teamsJs"
                    layer={0}
                    module={teamsJs}
                    path={""}
                    style={{
                        paddingRight: "4px",
                    }}
                />
            </FlexItem>
        </FlexColumn>
    );
};

interface ISupportedCheckProps {
    label: string;
    layer: number;
    module: any;
    path: string;
    style?: CSSProperties;
}

export const SupportedCheck: FC<ISupportedCheckProps> = ({
    label,
    layer,
    module,
    path,
    style,
}) => {
    const modules = Object.entries(module).filter(([_, value]) =>
        isModule(value)
    ) as [string, IModule[]][];
    const isColumnHeader = !isModule(module);
    const supportedText = safeIsSupported(module);
    const moduleDetails = getModuleDetails(path);
    return (
        <FlexColumn
            style={{
                paddingTop: "4px",
                paddingBottom: "4px",
                paddingLeft: `${Math.max(layer, 1) * 8}px`,
                backgroundColor: isColumnHeader
                    ? tokens.colorNeutralBackground3
                    : tokens.colorNeutralBackground1,
                ...style,
            }}
        >
            {!isColumnHeader && (
                <FlexRow fill="width" spaceBetween>
                    <FlexRow gap="smaller" vAlign="center">
                        <Tooltip
                            content={supportedText}
                            relationship="description"
                        >
                            {supportedText === "Yes" ? (
                                <CheckmarkCircle20Filled
                                    primaryFill={"green"}
                                />
                            ) : supportedText === "No" ? (
                                <ErrorCircle20Filled primaryFill={"red"} />
                            ) : (
                                <QuestionCircle20Filled
                                    primaryFill={"orange"}
                                />
                            )}
                        </Tooltip>
                        <Text
                            weight={layer === 1 ? "bold" : "regular"}
                            strikethrough={!!moduleDetails?.deprecated}
                        >
                            {label}
                        </Text>
                        {!!moduleDetails?.beta && (
                            <Tooltip content="Beta" relationship="description">
                                <Text
                                    size={300}
                                    align="center"
                                    weight={"regular"}
                                    style={{
                                        width: "16px",
                                    }}
                                >
                                    {"β"}
                                </Text>
                            </Tooltip>
                        )}
                    </FlexRow>
                    <FlexRow
                        gap="smaller"
                        vAlign="center"
                        style={{
                            paddingRight: "4px",
                        }}
                    >
                        {!!moduleDetails && (
                            <>
                                {!!moduleDetails.internal && (
                                    <Tooltip
                                        content="Internal"
                                        relationship="description"
                                    >
                                        <StoreMicrosoft16Regular
                                            primaryFill={
                                                tokens.colorNeutralForeground1
                                            }
                                        />
                                    </Tooltip>
                                )}
                                {!!moduleDetails.hidden && (
                                    <Tooltip
                                        content="Hidden"
                                        relationship="description"
                                    >
                                        <EyeOff16Regular
                                            primaryFill={
                                                tokens.colorNeutralForeground1
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </FlexRow>
                </FlexRow>
            )}
            {isColumnHeader && (
                <FlexRow fill="width" spaceBetween>
                    <Text weight={"bold"}>{"Module name"}</Text>
                    <Text
                        weight="bold"
                        style={{
                            paddingRight: "12px",
                        }}
                    >
                        {"Supported"}
                    </Text>
                </FlexRow>
            )}
            {modules.length > 0 && (
                <Divider style={{ marginTop: "4px", marginBottom: "4px" }} />
            )}
            {modules.map(([key, value]) => (
                <FlexColumn key={key}>
                    <SupportedCheck
                        label={key}
                        module={value}
                        layer={layer + 1}
                        path={path ? path + "/" + key : key}
                    />
                </FlexColumn>
            ))}
            {!isColumnHeader && <Divider style={{ marginTop: "4px" }} />}
        </FlexColumn>
    );
};
