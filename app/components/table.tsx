import { ArrowsPointingInIcon, ArrowsPointingOutIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { fromNow, notEmpty } from "~/utils";
import { Button, Dialog, DialogTrigger, Heading, Input, Label, Modal, ModalOverlay, TextField } from 'react-aria-components';
import { useEffect, useRef, useState } from "react";
import { map } from "cypress/types/lodash";

const Table = (props: any) => {
    const { expanded, close, materials, buttonRef } = props;
    const [checkedIds, setCheckedIds] = useState<string[]>(props.checkedIds ?? []);
    useEffect(() => {

    })

    return <>
        <div className="flex bg-gray-50 border-b p-1 items-center">
            <button className="flex items-center p-2 rounded border text-gray-700 text-xs hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                    if (expanded) {
                        close()
                        // setState('normal')
                    } else {
                        buttonRef?.current?.click()
                        // setState('expanded');
                    }
                }}
            >
                <p className="">{expanded ? 'Minimize' : 'Expand'}</p>
                {
                    expanded ?
                        <ArrowsPointingInIcon className="ml-1 w-3 h-3" /> :
                        <ArrowsPointingOutIcon className="ml-1 w-3 h-3" />
                }

            </button>

            {/* <button className="disabled:opacity-50 ml-3 flex items-center p-2 rounded border border-indigo-200 text-white text-xs bg-indigo-600 enabled:hover:bg-indigo-500 enabled:cursor-pointer"
                disabled
            >
                <p className="">Regenerate</p>
            </button>
            <p className="text-indigo-600 ml-1 text-xs">{`1 change detected`}</p> */}
        </div>
        <div className={`${expanded ? '' : 'h-96'} overflow-y-auto`}>
            <table className='w-full text-sm text-left text-gray-400'>
                <thead className={`text-xs bg-gray-50 sticky top-0 shadow-[0px_1px_0px_#e2e8f0] z-10`}>
                    <tr className="">
                        <th scope="col" className="px-6 py-3 font-normal ">
                            USE TO GENERATE
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal ">
                            TOPIC
                        </th>

                        <th scope="col" className="px-6 py-3 font-normal ">
                            SOURCE
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal ">
                            PUBLISHED DATE
                        </th>
                        <th scope="col" className="px-6 py-3 font-normal ">
                            TYPE
                        </th>
                        {/* <th scope="col" className="px-6 py-3 font-normal ">
                            UNIQUENESS SCORE
                        </th> */}

                    </tr>
                </thead>
                <tbody className="text-gray-900">
                    {
                        materials?.filter((m: any) => m.type == 'article')
                            .map((m: any, i: number) => m.body?.insights?.map(
                                (insight: any) => ({
                                    id: insight.id,
                                    insight: insight.insight,
                                    type: insight.type.toUpperCase(),
                                    exclusive_details_score: insight.exclusive_details_score,
                                    // contextually_helpful_score: insight.contextually_helpful_score,
                                    url: m.body.url,
                                    title: m.body.title,
                                    date_publish: m.body.date_publish ? (fromNow(m.body.date_publish) ?? 'recently') : 'recently'
                                })
                            ))
                            .flat()
                            .filter(notEmpty)
                            .sort((a: any, b: any) => b.exclusive_details_score - a.exclusive_details_score)
                            .map(({ id, insight, type, exclusive_details_score, url, title, date_publish }: any, i: number) => <tr key={id} className="transition-all duration-100  cursor-pointer text-gray-600 hover:bg-gray-100 group/row">
                                <td className=" border-b border-r">
                                    <div className="flex flex-col items-center">

                                        <label className="relative inline-flex items-center cursor-pointer"
                                            onChange={() => {
                                                // setCheckedIds((cids) => {
                                                //     const checked = checkedIds.some(x => x == id);
                                                //     return checked ? cids.filter(x => x != id) : [...cids, id]
                                                // })
                                            }}
                                        >
                                            <input type="checkbox" value="" className="sr-only peer"
                                                checked={checkedIds.some(x => x == id)}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                                        </label>
                                    </div>
                                </td>
                                <td className={`px-6 py-4 text-gray-900 ${i == 0 ? 'border-l border-r border-b' : 'border'}`}>
                                    {insight}
                                </td>
                                <td className={`px-6 py-4 text-gray-900 ${i == 0 ? 'border-l border-r border-b' : 'border'}`}>
                                    <div className="h-full flex items-center">

                                        <img
                                            className="object-cover w-4 h-4 mr-2"
                                            src={
                                                `https://www.google.com/s2/favicons?domain=${url}&sz=128`
                                            } />
                                        <a className="leading-none hover:underline line-clamp-1 "
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {title}
                                        </a>
                                    </div>
                                </td>
                                <td className={`px-6 py-4 text-gray-900 ${i == 0 ? 'border-l border-r border-b' : 'border'}`}>
                                    {date_publish}
                                </td>
                                <td className={`px-6 py-4 text-gray-900 ${i == 0 ? 'border-l border-r border-b' : 'border'}`}>
                                    {type}
                                </td>
                                {/* <td className={`px-6 py-4 text-gray-900 ${i == 0 ? 'border-l border-r border-b' : 'border'}`}>
                                    {exclusive_details_score}
                                </td> */}

                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    </>
}



export default function MaterialsTable(props: any) {
    const { materials } = props;
    // const [state, setState] = useState<'expanded' | 'normal'>('normal')
    const ref = useRef<any>()


    return <>
        <div className='border'>
            <Table materials={materials} buttonRef={ref} checkedIds={props.checkedIds} />
        </div>

        <DialogTrigger>
            <Button ref={ref} className="hidden" />
            <ModalOverlay className={({ isEntering, isExiting }) => `fixed inset-0 z-30 bg-black bg-opacity-25 flex items-center`}>
                <Modal className={({ isEntering, isExiting }) => `bg-white align-middle w-full`}>
                    <Dialog role="alertdialog" className="outline-none relative flex flex-col overflow-hidden pt-9 h-screen">
                        {({ close }) => (<>

                            <Table expanded close={close} materials={materials} buttonRef={ref} checkedIds={props.checkedIds} />

                        </>)}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    </>
}