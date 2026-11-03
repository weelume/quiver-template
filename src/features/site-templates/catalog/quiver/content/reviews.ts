import {text} from '../config'
import {caseStudies} from './work'
const quotesBySlug={
'northwind-dental':
 text('他们花了第一周观察我们实际如何工作。最终交付的智能体准确完成了这些工作，没有擅自加入我们未提出的内容。','They spent the first week watching how we actually work. The agent they built does exactly that work, and nothing we did not ask for.'),
 'ledgerly':text('{{brand}} 在开始构建前为每个机会估价。我们选择了两项有望一个月内回本的工作，结果如期实现。','{{brand}} priced every idea before they built anything. We picked the two that paid back in a month, and they did.'),
 'oakline-home':text('客服智能体把复杂工单连同团队愿意阅读的摘要交给人工。这种交接，正是整套产品的价值。','Our support agent hands over the hard tickets with a summary my team actually reads. That hand-off is the whole product.'),
 'vantage-legal':text('谨慎、有据可查，把基本功做到位。我们的律师如今从草稿开始，而不是面对空白页面。','Careful, cited, boring in the best way. Our associates now start from a draft instead of a blank page.'),
 'brightpath-realty':text('从首次交流到智能体能在凌晨两点安排看房，只用了六周。每周的数据报告让续约决定变得清楚。','Six weeks from the first call to an agent booking viewings at 2am. The weekly numbers make the renewal easy.'),
}
export const reviews=caseStudies.map(item=>({name:item.author,role:item.authorRole,client:item.client,image:item.portrait,metric:item.metric,metricLabel:item.metricLabel,quote:quotesBySlug[item.slug as keyof typeof quotesBySlug]}))
