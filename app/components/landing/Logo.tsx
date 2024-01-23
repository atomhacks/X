"use client"

import Rive from '@rive-app/react-canvas';

export default function Logo() {
    return (
        <div className="relative bottom-8">
            <div className="w-[24rem] h-[24rem]">
                <Rive src="/rive/logo.riv" />
            </div>
        </div>
    )
}