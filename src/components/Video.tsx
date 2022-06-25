import { DefaultUi, Player, Youtube } from "@vime/react";
import { Books, CaretRight, Checks, HandWaving } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";


interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
    }
  })

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
         <Player
         language="ptBR"
         mediaTitle={data.lesson.title}
         >
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player> 

          {/* <iframe 
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${data.lesson.videoId}`}
          ></iframe>*/}
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="nt-4 text-gray-600 leading-relaxed">
            {data.lesson.description}
            </p>
            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-4">
                <img 
                className="h-16 w-16 rounded-full border-2  border-purple-900"
                src={data.lesson.teacher.avatarURL}
                alt="" 
                />
                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                  <span className="text-grey-900 text-sm block">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <a href="" className="text-white-100 p-4 text-sm bg-purple-900 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-purple-500 transition-colors">
              <Books size={24} />
              Playbook Ampli
            </a>
            <a href="" className="p-4 text-sm border border-purple-900 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-purple-500 hover:text-white-100 transition-colors">
              <Checks size={24} />
              Completar aula
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="" className="bg-purple-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-purple-300 transition-colors">
            <div className="bg-purple-900 h-full p-6 flex items-center">
              <HandWaving size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Material Complementar
              </strong>
              <p className="text-sm text-grey-900 ">
              Acesse o material complementar para acelerar o seu desenvolvimento!
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={40} />
            </div>
          </a>

          <a href="" className="bg-purple-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-purple-300 transition-colors">
            <div className="bg-purple-900 h-full p-6 flex items-center">
              <HandWaving size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">
                Blog Amplimed
              </strong>
              <p className="text-sm text-grey-900 ">
              Acesse o o nosso portal de noticias!
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={40} />
            </div>
          </a>

        </div>
      </div>
    </div>
  )
}
