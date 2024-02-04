"use client"

import Rive from '@rive-app/react-canvas';

export default function Logo() {
    return (
        <div className="relative bottom-8">
            <div className="w-[28rem] h-[28rem] lg:w-[36rem] lg:h-[36rem]">
                <Rive src="/rive/logo.riv" />
            </div>
        </div>
    )
}