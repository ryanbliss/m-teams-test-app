import { FC } from "react";
import { FlexColumn, FlexItem, SupportedCheck } from "../components";
import * as teamsJs from "@microsoft/teams-js";

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
