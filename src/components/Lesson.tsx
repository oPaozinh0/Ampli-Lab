import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  })

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span  className="text-gray-800">
        {availableDateFormatted}
      </span>
      <div className={classnames('rounded bg-purple-200 border border-purple-600 p-4 mt-2 group-hover:bg-purple-300',{
        'bg-purple-600 text-white-200' : isActiveLesson,
      })}
      >
        <header className="flex items-center justify-between">
          
          {isLessonAvailable ? (
            <span className={classnames('text-sm font-medium flex items-center gap-2', {
              'text-purple-800' : !isActiveLesson,
              'text-white-200' : isActiveLesson,
            })}
            >
              <CheckCircle size={20} />
              Conteudo liberado
            </span>
          ) : (

            <span className={classnames('text-sm font-medium flex items-center gap-2', {
              'text-orange-400' : !isActiveLesson,
              'text-white-200' : isActiveLesson,
            })}>
              <Lock size={20} />
              Em Breve
            </span>
          )
        
        
        }


          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-purple-900 font-bold">
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRATICA' }
          </span>
        </header>

        <strong className={classnames('mt-5 block', {
          'text-white-200' : isActiveLesson,
          'text-grey-900' : !isActiveLesson,
        })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
