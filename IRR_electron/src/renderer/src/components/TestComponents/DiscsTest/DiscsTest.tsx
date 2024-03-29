import BaseLayout from '../../ui/baseLayout'
import { Card, CardBody } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { executeDiskTest } from './services/disc'
import { errorData } from '../../../utils/functions'
import NumberPartForm from './NumberPartForm'

function DiscsTest({ TestName, nextTest, profile }) {
  const { isLoading, error, isSuccess } = useQuery({
    queryKey: ['DiscsTest'],
    queryFn: () => executeDiskTest(profile),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !profile.integrated // la consulta se ejecutará si profile.integrated es false
  })

  useEffect(() => {
    if (!isLoading && isSuccess) {
      nextTest(TestName, {
        result: true,
        message: 'Prueba discos exitosa'
      })
    } else if (!isLoading && error) {
      nextTest(TestName, {
        result: false,
        message: errorData(error)
      })
    }
  }, [isLoading])

  return (
    <BaseLayout>
      {!profile.integrated ? (
        <Card className="p-10">
          <CardBody>
            <p>Ejecutando Prueba de discos...</p>
          </CardBody>
        </Card>
      ) : (
        <NumberPartForm
          TestName={TestName}
          nextTest={nextTest}
          profile={profile}
        />
      )}
    </BaseLayout>
  )
}

export default DiscsTest
