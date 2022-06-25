import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Subscribe() {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event?.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px] ">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
          Sistema com <strong className="text-purple-900">prontuário Eletrônico e Telemedicina</strong>
          </h1>
          <p className="mt-4 text-gray-900 leading-relaxed">
          O Amplimed é o primeiro software médico com a telemedicina integrada ao prontuário eletrônico, conectando médicos e pacientes de forma segura.
          </p>
        </div>

        <div className="p-8 bg-white-100 border-purple-700 rounded">
            <strong className="text-2xl mb-6 block">Faça seu teste grátis!</strong>

            <form onSubmit={handleSubscribe} action="" className="flex flex-col gap-2 w-full">
              <input 
                className="bg-white-200 rounded px-5 h-14"
                type="text" 
                placeholder="Seu nome completo" 
                onChange={event => setName(event.target.value)}
              />
              <input 
                className="bg-white-200 rounded px-5 h-14"
                type="email" 
                placeholder="Digite seu email" 
                onChange={event => setEmail(event.target.value)}
              />

              <button 
                type="submit"
                disabled={loading}
                className="mt-4 bg-purple-300 uppercase py-4 rounded font-bold text-sm hover:bg-purple-500 transition-colors disabled:opacity-50">
                Garantir meu teste!
              </button>
            </form>
        </div>
      </div>
      
      <img src="/src/assets/code.png" className="mt-10 max-w-[1100px]" alt="" />
    </div>
  )
}