export function assembleLayout(
    workflowLayout,
    supportLayout

){

    return [
        ...workflowLayout.lanes.flatMap(
            lane => lane.nodes
        ),
        ...supportLayout.supports,
        ...supportLayout.planning,
        ...supportLayout.infrastructure
    ];

}