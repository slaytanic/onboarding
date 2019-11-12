import { RenderResult } from '@testing-library/react'
import { MemoryHistory } from 'history'

export type RenderAndHistory = RenderResult & { history: MemoryHistory }
