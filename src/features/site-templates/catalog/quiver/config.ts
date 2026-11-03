export interface Copy {zh:string;en:string}
export const text=(zh:string,en:string):Copy=>({zh,en})
export const brand={name:text('Quiver','Quiver'),email:'hello@quiver.studio',phone:'+1 (415) 555-0192',phoneHref:'+14155550192',address:text('美国旧金山 Townsend 街 88 号，邮编 94107','88 Townsend St, San Francisco, CA 94107'),hours:text('周一至周五 · 太平洋时间 9:00–18:00','Mon–Fri · 9:00–18:00 PT'),tagline:text('让每一份重复工作 都有新的解法','Applied minds. Agents at work.'),founded:2021}
export const copyrightYear=2026
export const asset=(file:string)=>'/templates/quiver/assets/'+file
export const art={front:'FPqrml64m4dOJNF7asUQcAziv5w.webp',frontNormal:'DJOwFtHHkkj1fsWGB5SPQwulc.webp',profile:'aXzJoNyYylM1bsIi9AQBJLNitw.webp',profileNormal:'a089OvftbNmByv75xqfOHeAREuI.webp',signoff:'ItanYfMXnkmn097dzhrIDLjQO5o.webp',strategy:'zsA0OT2vZXb2Xy0iwnrRHTfWFKE.webp',buildTeam:'O5reRIOLgNKSa6GakqcLWgTT8o.webp',founder:'msSr3aFiYWr5AeW5HFJveqW8Ikw.webp'}
export const navigation=[['services',text('服务','Services')],['work',text('案例','Work')],['agents',text('智能体','Agents')],['process',text('流程','Process')],['pricing',text('价格','Pricing')],['about',text('关于','About')]] as const
