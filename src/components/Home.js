import React from "react";
import GcSideBar from './GcSideBar';
import SearchAppBar from './SearchAppBar';
import DataView from "./DataView";

export default function Home() {
    return (
        <div className="Home">
            <SearchAppBar />

            <div className="View">
                <GcSideBar /><DataView />
            </div>
        </div>
    );
}