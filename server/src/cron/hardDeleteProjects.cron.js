import cron from 'node-cron'
import { projectsRepository } from '~/modules/projects/repositories/projects.repositories'

export const startHardDeleteProjectJob = () => {
    cron.schedule('0 3 * * *', async () => {
        console.log('[CRON] Hard delete expired projects')
        await projectsRepository.hardDeleteExpired()
    })
}
