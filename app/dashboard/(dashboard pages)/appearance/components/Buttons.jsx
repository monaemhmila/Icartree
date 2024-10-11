"use client"
import Image from "next/image";
import Button from "../elements/Button";
import ColorPicker from "../elements/ColorPicker";
import { updateThemeButton } from "@/lib/update data/updateTheme";

export default function Buttons() {
    const handleUpdateTheme = async(type) => {
        await updateThemeButton(type);
    }
    return (
        <div className="w-full bg-white rounded-3xl my-3 flex flex-col p-6">
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Fill</span>
                <div className="items-center flex gap-5">
                    <Button type={0} modifierClass={"bg-black"} />
                    <Button type={1} modifierClass={"bg-black rounded-lg"} />
                    <Button type={2} modifierClass={"bg-black rounded-3xl"} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Outline</span>
                <div className="items-center flex gap-5">
                    <Button type={3} modifierClass={"border border-black"} />
                    <Button type={4} modifierClass={"border border-black rounded-lg"} />
                    <Button type={5} modifierClass={"border border-black rounded-3xl"} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Hard Shadow</span>
                <div className="items-center flex gap-5">
                    <Button type={6} modifierClass={"bg-white border border-black "} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                    <Button type={7} modifierClass={"bg-white border border-black rounded-lg"} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                    <Button type={8} modifierClass={"bg-white border border-black rounded-3xl"} modifierStyles={{filter: `drop-shadow(4px 4px 0px black)`}} />
                </div>
            </section>
            <section className="flex gap-5 text-sm flex-col mb-10">
                <span className="font-semibold">Soft Shadow</span>
                <div className="items-center flex gap-5">
                    <Button type={9} modifierClass={"bg-white shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                    <Button type={10} modifierClass={"bg-white rounded-lg shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                    <Button type={11} modifierClass={"bg-white rounded-3xl shadow-[0_4px_4px_0_rgb(0,0,0,0.16)]"} />
                </div>
            </section>
            
            <section className="flex text-sm flex-col mb-10">
                <span className="font-semibold mb-[-10px]">Theme text colour</span>
                <ColorPicker colorFor={4} />
            </section>
            <section className="flex text-sm flex-col mb-10">
                <span className="font-semibold mb-[-10px]">Button colour</span>
                <ColorPicker colorFor={1} />
            </section>
            <section className="flex text-sm flex-col mb-10">
                <span className="font-semibold mb-[-10px]">Button font colour</span>
                <ColorPicker colorFor={2} />
            </section>
            <section className="flex text-sm flex-col">
                <span className="font-semibold mb-[-10px]">Shadow colour</span>
                <ColorPicker colorFor={3} />
            </section>
        </div>
    );
} 