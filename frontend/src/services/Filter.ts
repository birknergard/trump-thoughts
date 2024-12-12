import IThought from "../interfaces/Thought"

const Filter = ((thoughts : IThought[]) => { 
    return { 
        byTitle : (query : string) => {
            if(query === "") return thoughts

            const filteredList = thoughts.filter(thought => { 
                return thought.title.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byTopic : (query : string) => {
            if(query === "") return thoughts
    
            const filteredList = thoughts.filter(thought => { 
                return thought.topic.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byTone : (query : string) => {
            if(query === "") return thoughts

            const filteredList = thoughts.filter(thought => { 
                return thought.tone.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byMultiple : (titleQuery : string, topicQuery : string, toneQuery : string) => {
            const topicList = Filter(thoughts).byTopic(topicQuery) 
            const titleList = Filter(thoughts).byTitle(titleQuery)
            const toneList = Filter(thoughts).byTone(toneQuery)

            // merging lists on common elements
            return (() => {
                return topicList.filter(thought => {
                    return toneList.includes(thought) && titleList.includes(thought) 
                })
            })()
        }
    }
})

export default Filter